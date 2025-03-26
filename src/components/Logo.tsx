import Link from "next/link"
import logoMigliore from "/public/logoMigliore.png"
import Image from "next/image"
export default function Logo() {
  return (
    <div className="flex gap-2 items-center">
      <Image width={60} height={60} src={logoMigliore} alt="logo" />

      <Link href={"/"}>
        {" "}
        <span className="font-bold font-poppins  text-xl">
          Migliore Company{" "}
        </span>
      </Link>
    </div>
  )
}
