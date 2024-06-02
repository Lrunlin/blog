export async function GET() {
  if (process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID) {
    return new Response(
      `google.com, pub-${process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}, DIRECT, f08c47fec0942fa0`,
      {
        status: 200,
        headers: {
          "content-type": "text/txt; charset=utf-8",
        },
      }
    );
  } else {
    return new Response(undefined, {
      status: 404,
    });
  }
}
