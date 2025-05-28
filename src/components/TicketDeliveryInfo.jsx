export default function TicketDeliveryInfo({ nrOfTickets, setNrOfTickets, customerName, customerEmail }) {
  return (
    <div className="TicketDeliveryInfo__mainContainer">
      <div className="mainContainer__customerDetails">
        <a>
          <strong>Biljettleverans</strong>
        </a>
        <a>Ange din e-postadress:</a>
        <input placeholder="exempel@mail.com"></input>
        <a>Ange ditt fullständiga namn:</a>
        <input></input>
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
      </div>
    </div>
  )
}
