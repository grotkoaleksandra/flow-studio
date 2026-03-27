import type { Dictionary } from "@/i18n/types";
import { getVersion } from "@/lib/version";

export function Footer({ dict }: { dict: Dictionary }) {
  const version = getVersion();
  return (
    <footer className="bg-charcoal text-white/60 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-xl font-light text-white/80 tracking-wide">
              {dict.metadata.title}
            </p>
            <p className="text-sm mt-2 font-light">
              Breathe &middot; Move &middot; Connect
            </p>
          </div>
          <div className="text-center sm:text-right">
            <p className="text-sm font-light">
              &copy; {new Date().getFullYear()} {dict.metadata.title}. {dict.footer.rights}
            </p>
            {version !== "dev" && (
              <p className="mt-2 text-xs text-white/30" data-site-version>
                {version}
              </p>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
