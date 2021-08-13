export async function callApi<T>(url: string): Promise<T> {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Error calling API Endpoint: ${url}`)
  }
  return response.json() as Promise<T>;
}