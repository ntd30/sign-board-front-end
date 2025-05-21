import { useState, useEffect } from "react";
import { fetchAllContactAPI } from "../../services/api.service";
import ContactTable from "../../components/admin/contact/contact.table";
import moment from "moment";

const ContactPage = () => {
    const [dataContacts, setDataContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]); // Danh sách liên hệ sau khi lọc
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [loadingTable, setLoadingTable] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); // Thêm trạng thái searchTerm

    // Tải toàn bộ danh sách liên hệ
    const loadContacts = async () => {
        setLoadingTable(true);
        try {
            const res = await fetchAllContactAPI(1, 1000); // Tăng pageSize để lấy nhiều dữ liệu
            if (res?.data) {
                setDataContacts(res.data.content);
                setFilteredContacts(res.data.content); // Khởi tạo danh sách đã lọc
                setTotal(res.data.totalElements);
            }
        } catch (error) {
            console.error("Lỗi khi tải danh sách liên hệ:", error);
        }
        setLoadingTable(false);
    };

    // Lọc liên hệ dựa trên searchTerm
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
                contact.createdAt ? moment(contact.createdAt).format("DD/MM/YYYY HH:mm:ss") : ""
            ]
                .filter(value => value) // Loại bỏ giá trị undefined/null
                .join(" ")
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        );
        setFilteredContacts(filtered);
        setTotal(filtered.length);
        setCurrent(1); // Đặt lại trang về 1 khi tìm kiếm
    }, [searchTerm, dataContacts]);

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
                dataContacts={filteredContacts} // Truyền danh sách đã lọc
                loadingTable={loadingTable}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm} // Truyền searchTerm và setSearchTerm
            />
        </>
    );
};

export default ContactPage;