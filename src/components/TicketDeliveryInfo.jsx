export default function TicketDeliveryInfo({
  nrOfTickets,
  setNrOfTickets,
  customerName,
  setCustomerName,
  customerEmail,
  setCustomerEmail,
  emailCorrectFormat,
  setEmailCorrectFormat,
}) {
  return (
    <div className="TicketDeliveryInfo__mainContainer">
      <div className="mainContainer__customerDetails">
        <a>
          <strong>Biljettleverans</strong>
        </a>
        <a>Ange din e-postadress:</a>
        <input
          placeholder="exempel@mail.com"
          type="email"
          required
          value={customerEmail}
          onChange={(e) => {
            const email = e.target.value
            setCustomerEmail(email)
            const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
            setEmailCorrectFormat(isValid)
          }}
        ></input>
        <a>Ange ditt fullständiga namn:</a>
        <input
          placeholder="Förnamn Efternamn"
          value={customerName}
          onChange={(n) => {
            setCustomerName(n.target.value)
          }}
        ></input>
      </div>
      <div className="mainContainer__ticketSelector">
        <a>
          <strong>Välj antal biljetter:</strong>
        </a>
        <div className="ticketSelector__nrOfTickets">
          <img
            src="/img/subtract__btn.webp"
            onClick={() => {
              if (nrOfTickets > 0) {
                setNrOfTickets(nrOfTickets - 1)
              }
            }}
          ></img>
          <span>{nrOfTickets}</span>
          <img
            src="/img/add__btn.webp"
            onClick={() => {
              setNrOfTickets(nrOfTickets + 1)
            }}
          ></img>
        </div>
        <a>
          <strong>Pris: 149kr/st</strong>
        </a>
        <a>Totalt: {nrOfTickets * 149}kr</a>
        <a>Betalning sker på plats</a>
      </div>
    </div>
  )
}
