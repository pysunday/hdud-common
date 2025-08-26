/*
import type { APIRoute } from 'astro';
import getRobotTxt from '@hdud/common/libs/robot';

const robotTxt = await getRobotTxt()

export const GET: APIRoute = ({ site }) => {
    return new Response(robotTxt(site));
};
*/
export default async function() {
  const darkVisitors = await fetch("https://api.darkvisitors.com/robots-txts", {
      method: "POST",
      headers: {
          "Authorization": "Bearer " + import.meta.env.darkvisitors_token,
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          agent_types: [
              "AI Data Scraper",
              "Undocumented AI Agent"
          ],
          disallow: "/"
      })
  }).then((response) =>
      response.text()
  );

  return site => {
    const sitemapURL = new URL('sitemap-index.xml', site);
    return `
${darkVisitors}

User-agent: *
Disallow:

Sitemap: ${sitemapURL.href}
`;
  }
}
