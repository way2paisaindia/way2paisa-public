export const metadata = {
  title: 'Mumbai Property Projects by Locality | Residential & Commercial | Way2Paisa',
  description: 'Browse verified residential and commercial properties across 35 Mumbai localities including Bandra, Juhu, Andheri, Worli, Lower Parel, Nariman Point and Colaba. Request sourcing where verified stock is unavailable.',
  alternates: { canonical: '/mumbai-localities' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Mumbai Property Projects by Locality | Way2Paisa',
    description: 'Live verified project coverage and sourcing enquiries across 35 high-demand Mumbai neighbourhoods.',
    url: 'https://www.way2paisa.in/mumbai-localities',
    type: 'website',
  },
};
export default function MumbaiLocalitiesLayout({children}) {
  return children;
}
