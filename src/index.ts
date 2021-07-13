import RingCentral from '@rc-ex/core';

const rc = new RingCentral({
  clientId: process.env.RINGCENTRAL_CLIENT_ID,
  clientSecret: process.env.RINGCENTRAL_CLIENT_SECRET,
  server: process.env.RINGCENTRAL_SERVER_URL,
});

(async () => {
  await rc.authorize({
    username: process.env.RINGCENTRAL_USERNAME!,
    extension: process.env.RINGCENTRAL_EXTENSION,
    password: process.env.RINGCENTRAL_PASSWORD!,
  });
  const entries = await rc.restapi().account().directory().entries().list({
    showFederated: true,
    type: 'User',
    page: '1',
    perPage: 100,
  });
  // console.log(JSON.stringify(entries, null, 1));

  console.log(`${entries.records?.length} entries were found in total`);
  console.log(
    `${
      entries.records?.filter(r => (r as any).customFields !== undefined).length
    } entries have customFields`
  );
  console.log(
    `${
      entries.records?.filter(r => (r as any).customFields === undefined).length
    } entries have NO customFields`
  );

  await rc.revoke();
})();
