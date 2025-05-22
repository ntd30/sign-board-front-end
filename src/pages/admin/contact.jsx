import { useState, useEffect } from "react";
import { fetchAllContactAPI } from "../../services/api.service";
import ContactTable from "../../components/admin/contact/contact.table";
import moment from "moment";

const ContactPage = () => {
    const [dataContacts, setDataContacts] = useState([]); // All contacts (up to 1000)
    const [displayedContacts, setDisplayedContacts] = useState([]); // Paginated contacts
    const [filteredContacts, setFilteredContacts] = useState([]); // Filtered contacts
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5); // Set pageSize to 5
    const [total, setTotal] = useState(0);
    const [loadingTable, setLoadingTable] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); // Search term for filtering

    // Load all contacts (up to 1000) and sort them
    const loadContacts = async () => {
        setLoadingTable(true);
        try {
            const res = await fetchAllContactAPI(1, 1000); // Fetch up to 1000 contacts
            if (res?.data) {
                // Sort all contacts by id in descending order
                const sortedContacts = res.data.content.sort((a, b) => b.id - a.id);
                setDataContacts(sortedContacts);
                setFilteredContacts(sortedContacts); // Initialize filtered contacts
                setTotal(res.data.totalElements);
            }
        } catch (error) {
            console.error("Lỗi khi tải danh sách liên hệ:", error);
        }
        setLoadingTable(false);
    };

    // Filter contacts based on searchTerm
    useEffect(() => {
        const filtered = dataContacts.filter((contact) =>
            [
                contact.productName,
                contact.name,
                contact.phone,
                contact.email,
                contact.address,
                contact.message,
                contact.status,
                contact.createdAt ? moment(contact.createdAt).format("DD/MM/YYYY HH:mm:ss") : "",
            ]
                .filter((value) => value) // Remove undefined/null values
                .join(" ")
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        );
        setFilteredContacts(filtered);
        setTotal(filtered.length);
        setCurrent(1); // Reset to page 1 when search term changes
    }, [searchTerm, dataContacts]);

    // Handle client-side pagination
    useEffect(() => {
        // Calculate the slice of filtered contacts to display based on current page and pageSize
        const startIndex = (current - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedContacts = filteredContacts.slice(startIndex, endIndex);
        setDisplayedContacts(paginatedContacts);
    }, [filteredContacts, current, pageSize]);

    // Load contacts when the component mounts
    useEffect(() => {
        loadContacts();
    }, []);

    return (
        <>
            <ContactTable
                current={current}
                setCurrent={setCurrent}
                pageSize={pageSize}
                setPageSize={setPageSize}
                total={total}
                loadContacts={loadContacts}
                dataContacts={displayedContacts} // Pass paginated contacts
                loadingTable={loadingTable}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm} // Pass searchTerm and setSearchTerm
            />
        </>
    );
};

export default ContactPage;