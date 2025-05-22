export default function TicketDeliveryInfo() {
  return (
    <div className="TicketDeliveryInfo__mainContainer">
      <div className="mainContainer__customerDetails">
        <a>
          <strong>Biljettleverans</strong>
        </a>
        <a>Ange din e-postadress:</a>
        <input></input>
        <a>Ange ditt fullständiga namn:</a>
        <input></input>
      </div>
      <div className="mainContainer__ticketSelector">
        <a>
          <strong>Välj antal biljetter:</strong>
        </a>
        <div className="ticketSelector__nrOfTickets">
          <img src="/img/subtract__btn.webp"></img>
          <span>0</span>
          <img src="/img/add__btn.webp"></img>
        </div>
        <a>
          <strong>Valda platser:</strong>
        </a>
      </div>
    </div>
  )
}
