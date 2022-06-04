import Link from "next/link";

const EducationLinkList = () => {
  return (
    <div className={"container text-center"}>
      <ul>
        <li className={"my-3"}>
          <h4>Index</h4>
          <hr />
        </li>
        <li className={"my-3"}>
          <Link href={"link2"}>Link 1</Link>
        </li>
        <li className={"my-3"}>
          <Link href={"link2"}>Link 1</Link>
        </li>
        <li className={"my-3"}>
          <Link href={"link2"}>Link 1</Link>
        </li>
        <li className={"my-3"}>
          <Link href={"link2"}>Link 1</Link>
        </li>
        <li className={"my-3"}>
          <Link href={"link2"}>Link 1</Link>
        </li>
        <li className={"my-3"}>
          <Link href={"link2"}>Link 1</Link>
        </li>
        <li className={"my-3"}>
          <Link href={"link2"}>Link 1</Link>
        </li>
      </ul>
    </div>
  );
};

export default EducationLinkList;
