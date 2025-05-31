export default function TicketDeliveryInfo({
  nrOfTickets,
  setNrOfTickets,
  customerName,
  setCustomerName,
  customerEmail,
  setCustomerEmail,
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
          value={customerEmail}
          onChange={(e) => {
            setCustomerEmail(e.target.value)
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
        <a>
          Summa: {nrOfTickets}st x 149kr = {nrOfTickets * 149}kr
        </a>
      </div>
    </div>
  )
}
