import { Link, useRouteError } from "react-router-dom"
import { Result, Button } from "antd"

export default function Error403Page() {
  const error = useRouteError();
  console.error(error);

  return (
    <Result
      status="403"
      title="Oops!"
      subTitle={<i>Bạn không có quyền truy cập nguồn tài nguyên này</i>}
      extra={<Button type="primary"><Link to="/">Trở về trang chủ</Link></Button>}
    />
  );
}
