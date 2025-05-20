import { useState } from "react"
import { fetchAllContactAPI } from "../../services/api.service"
import ContactTable from "../../components/admin/contact/contact.table"

const ContactPage = () => {
    const [dataContacts, setDataContacts] = useState([])
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [total, setTotal] = useState(0)
    const [loadingTable, setLoadingTable] = useState(false)

    const loadContacts = async () => {
        setLoadingTable(true)
        const res = await fetchAllContactAPI(current, pageSize)
        if (res?.data) {
            setTotal(res?.data?.totalElements)
        }
        setDataContacts(res?.data?.content)
        setLoadingTable(false)
    }

    return (
        <>
            <ContactTable
                current={current}
                setCurrent={setCurrent}
                pageSize={pageSize}
                setPageSize={setPageSize}
                total={total}
                loadContacts={loadContacts}
                dataContacts={dataContacts}
                loadingTable={loadingTable}
            />
        </>
    )
}

export default ContactPage