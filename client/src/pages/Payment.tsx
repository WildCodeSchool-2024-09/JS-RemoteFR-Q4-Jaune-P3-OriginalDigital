import "../styles/payment.css";
import PaymentForm from "../components/PaymentForm";

export default function Payment() {
  return (
    <section className="payment-section">
      <h1>Souscrire à l'offre Premium</h1>
      <PaymentForm />
    </section>
  );
}
