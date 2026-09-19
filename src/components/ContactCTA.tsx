"use client";

import { Reveal } from "./Reveal";

const FIELDS = [
  { label: "Name", type: "text", name: "name" },
  { label: "Company", type: "text", name: "company" },
  { label: "Phone or email", type: "text", name: "contact" },
];

const PRACTICE_AREAS = [
  "Commercial Litigation & Disputes",
  "Arbitration",
  "Corporate & Commercial",
  "Real Estate",
  "Employment",
  "Private Client",
  "Criminal / White-Collar",
];

export function ContactCTA() {
  return (
    <section id="contact" className="bg-navy py-[clamp(56px,10vh,120px)]">
      <div className="wrap">
        <div className="flex items-baseline gap-3 mb-8">
          <span className="mono-label font-bold text-bronze-light">07 — Contact</span>
          <span className="h-px flex-1 bg-line-on-navy" />
        </div>

        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Reveal>
              <h2 className="font-serif font-semibold text-ivory leading-[1.08] text-[clamp(28px,3.8vw,52px)] max-w-[13ch]">
                Tell us how we can <em>help</em>.
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="body-copy mt-5 max-w-[38ch] text-muted-on-navy">
                Book a consultation directly, or send a short summary of your matter below.
                We respond to every enquiry — no automated intermediaries, no pressure.
              </p>
            </Reveal>
            <Reveal delay={0.16} className="mt-8 flex flex-col gap-3">
              <a href="tel:+97140000000" className="mono-label flex items-center justify-between border-b hairline-on-navy py-3 text-ivory hover:text-champagne transition-colors">
                Call the firm <span>+971 4 000 0000</span>
              </a>
              <a href="https://wa.me/97140000000" className="mono-label flex items-center justify-between border-b hairline-on-navy py-3 text-ivory hover:text-champagne transition-colors">
                WhatsApp <span>Chat now</span>
              </a>
              <a href="mailto:info@fsadvocates.ae" className="mono-label flex items-center justify-between border-b hairline-on-navy py-3 text-ivory hover:text-champagne transition-colors">
                Email <span>info@fsadvocates.ae</span>
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <form className="border hairline-on-navy p-[clamp(20px,3vw,34px)]" onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-5 sm:grid-cols-3">
                {FIELDS.map((f) => (
                  <label key={f.name} className="block">
                    <span className="mono-label text-muted-on-navy">{f.label}</span>
                    <input
                      type={f.type}
                      name={f.name}
                      className="mt-2 w-full border-b hairline-on-navy bg-transparent pb-2 text-[13px] text-ivory outline-none focus:border-bronze-light"
                    />
                  </label>
                ))}
              </div>

              <label className="mt-5 block">
                <span className="mono-label text-muted-on-navy">Practice area</span>
                <select
                  name="practice"
                  className="mt-2 w-full border-b hairline-on-navy bg-navy pb-2 text-[13px] text-ivory outline-none focus:border-bronze-light"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select the closest match
                  </option>
                  {PRACTICE_AREAS.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </label>

              <label className="mt-5 block">
                <span className="mono-label text-muted-on-navy">Matter summary</span>
                <textarea
                  name="summary"
                  rows={4}
                  className="mt-2 w-full resize-none border-b hairline-on-navy bg-transparent pb-2 text-[13px] text-ivory outline-none focus:border-bronze-light"
                />
              </label>

              <label className="mt-5 flex items-start gap-3">
                <input type="checkbox" name="consent" className="mt-1" />
                <span className="mono-label text-muted-on-navy leading-relaxed">
                  I agree to be contacted about this enquiry and understand that submitting this
                  form does not create a lawyer-client relationship.
                </span>
              </label>

              <button
                type="submit"
                className="mono-label mt-7 inline-flex items-center border border-bronze bg-bronze px-6 py-[13px] font-bold text-navy-deep transition-colors hover:bg-champagne hover:border-champagne"
              >
                Speak With Our Team
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
