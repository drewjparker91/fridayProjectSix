export async function callAPIExchange() {
  try {
    let response = await fetch (`https://v6.exchangerate-api.com/v6/${process.evn.API_KEY}/latest/USD`);
    let jsonifiedResponse;
    if (response.ok && response.status === 200) {
      jsonifiedResponse = await response.json();
    } else {
      jsonifiedResponse = false;
    }
    return jsonifiedResponse;
  } catch(error) {
    return false;
  }
}
