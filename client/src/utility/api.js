export async function fetchData(url, options = {}) {
  try {
    const response = await fetch(url, options);

    let data = null;
    const contentType = response.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      data = await response.json();
    }

    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        errorMessage: data?.error || 'Something went wrong.',
      };
    }

    return { ok: true, status: response.status, data };
  } catch (err) {
    console.error(`Error in fetch: ${err}`);
    return { ok: false, status: null, errorMessage: err.message };
  }
}
