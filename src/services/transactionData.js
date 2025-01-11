const TRANSACTION_TABLE_URL = `${import.meta.env.VITE_TRANSACTION_TABLE_URL}`
const AIRTABLE_ACCESS_TOKEN = `${import.meta.env.VITE_AIRTABLE_ACCESS_TOKEN}`
const AIRTABLE_URL = `https://api.airtable.com/v0/${TRANSACTION_TABLE_URL}`

const transactionData = async () => {
  try {
    const res = await fetch(AIRTABLE_URL, {headers: {
      Authorization: `Bearer ${AIRTABLE_ACCESS_TOKEN}`
    }});
    const data = await res.json()
    return data.records;
  } catch (err) {
    console.log(err);
  };
}

export { transactionData }