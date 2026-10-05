import ContactHero from "../../components/website/contact/ContactHero";
import ContactMethods from "../../components/website/contact/ContactMethods";
import ContactForm from "../../components/website/contact/ContactForm";
import FAQSection from "../../components/website/contact/FAQSection";
import FinalContactCTA from "../../components/website/contact/FinalContactCTA";

const Contact = () => {
  return (
    <div className="bg-[#F8FAF9] text-[#101828] min-h-screen">
      {/* 1. Hero Section */}
      <ContactHero />

      {/* 2. Contact Method Cards (Overlapping Shelf) */}
      <ContactMethods />

      {/* 3. Direct Message & Interactive Map Section */}
      <ContactForm />

      {/* 4. FAQ Section */}
      <FAQSection />

      {/* 5. Final CTA Section */}
      <FinalContactCTA />
    </div>
  );
};

export default Contact;
