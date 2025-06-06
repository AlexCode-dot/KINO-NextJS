import { QRCodeSVG } from 'qrcode.react'

export default function QrCodeGenerator({ id }) {
  const recievedId = id
  return (
    <>
      <QRCodeSVG value={recievedId} />
    </>
  )
}
