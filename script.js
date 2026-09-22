const scheduleButton = document.getElementById('scheduleButton');
const contactSection = document.getElementById('contact');
const cepInput = document.getElementById('cep');
const streetInput = document.getElementById('street');
const districtInput = document.getElementById('district');

scheduleButton.addEventListener('click', () => {
  contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

async function fillAddressFromCep(rawCep) {
  const digits = rawCep.replace(/\D/g, '');

  if (digits.length !== 8) {
    return;
  }

  try {
    const response = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
    if (!response.ok) {
      throw new Error('CEP lookup failed');
    }

    const data = await response.json();

    if (data.erro) {
      return;
    }

    streetInput.value = data.logradouro || '';
    districtInput.value = data.bairro || '';
  } catch (error) {
    console.error('Não foi possível buscar o CEP.', error);
  }
}

cepInput.addEventListener('blur', (event) => {
  fillAddressFromCep(event.target.value);
});
