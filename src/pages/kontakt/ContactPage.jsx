import DynamicHeader from "../../components/header/dynamicHeader";
import TextSection from "../../components/text-section/textSection";
import ContactForm from "../../components/forms/ContactForm";

const ContactPage = () => {
  return (
    <div>
      <DynamicHeader backgroundImage="/image_03.jpg" title="Kontakt Gitte" />
      <TextSection
        title="Vil du booke et ophold? 
Eller har du blot et spørgsmål?"
        content="Så tøv ikke med at tage kontakt til os herunder. 
Vi bestræber os på at svare på henvendelser indenfor 24 timer, men op til ferier kan der være travlt, og svartiden kan derfor være op til 48 timer."
      />
      <ContactForm />
    </div>
  );
};

export default ContactPage;
