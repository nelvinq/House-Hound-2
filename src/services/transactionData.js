const TRANSACTION_TABLE_URL = `${import.meta.env.VITE_TRANSACTION_TABLE_URL}`
const AIRTABLE_ACCESS_TOKEN = `${import.meta.env.VITE_AIRTABLE_ACCESS_TOKEN}`


const transactionData = async () => {
  try {
    const res = await fetch(TRANSACTION_TABLE_URL, {headers: {
      Authorization: `Bearer ${AIRTABLE_ACCESS_TOKEN}`
    }});
    const data = await res.json()
    return data.records;
  } catch (err) {
    console.log(err);
  };
}

export { transactionData }