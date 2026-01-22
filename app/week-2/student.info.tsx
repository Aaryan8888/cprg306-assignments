import Link from "next/link";

export default function StudentInfo() {
  return (
    <section>
      <p>Your Name: Aaryan</p>
      <p>
        GitHub Repository:{" "}
        <Link href="https://github.com/Aaryan8888/cprg306-assignments">
          https://github.com/Aaryan8888/cprg306-assignments
        </Link>
      </p>
    </section>
  );
}