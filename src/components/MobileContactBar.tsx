const ITEMS = [
  {
    href: "tel:+97140000000",
    label: "Call",
    icon: (
      <path d="M3 4c0-.6.4-1 1-1h3l1.5 4-2 1.5c1 2.5 3 4.5 5.5 5.5L13 12l4 1.5v3c0 .6-.4 1-1 1C8.5 17.5 3 12 3 4Z" />
    ),
  },
  {
    href: "https://wa.me/97140000000",
    label: "WhatsApp",
    icon: <path d="M4 17 5.2 13A7 7 0 1 1 8 15.8L4 17Z" />,
  },
  {
    href: "#contact",
    label: "Consult",
    icon: <path d="M4 5h12v9H8l-4 3V5Z" />,
  },
];

export function MobileContactBar() {
  return (
    <div className="md:hidden fixed inset-x-0 bottom-0 z-[65] grid grid-cols-3 border-t border-line bg-navy">
      {ITEMS.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className="mono-label flex flex-col items-center gap-1 py-3 text-champagne border-r last:border-r-0 hairline-on-navy"
        >
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            {item.icon}
          </svg>
          {item.label}
        </a>
      ))}
    </div>
  );
}
