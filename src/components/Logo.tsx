import Link from "next/link"
import logoMigliore from "/public/logoMigliore.png"
import Image from "next/image"
export default function Logo() {
  return (
    <div className="flex justify-center w-full  items-center">
      <Link href={"/"}>
        <Image width={60} height={60} src={logoMigliore} alt="logo" />{" "}
      </Link>
    </div>
  )
}
