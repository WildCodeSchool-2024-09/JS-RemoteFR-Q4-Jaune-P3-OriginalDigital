import "../styles/payment.css";
import PaymentForm from "../components/PaymentForm";

export default function Payment() {
  return (
    <section className="payment-section">
      <h1>Offre Premium</h1>
      <p>Profiter de l'ensemble des films en souscrivant à l'offre premium.</p>
      <PaymentForm />
    </section>
  );
}
