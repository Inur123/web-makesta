export default function AppLogo() {
    return (
        <div className="flex w-full items-center justify-center md:justify-start overflow-visible">
            {/* WIDE LOGOS */}
            <img src="/images/logo-makesta-2.png" alt="Logo Makesta" className="h-10 w-auto object-left object-contain block dark:hidden group-data-[collapsible=icon]:!hidden" />
            <img src="/images/logo-putih.png" alt="Logo Makesta" className="h-10 w-auto object-left object-contain hidden dark:block dark:group-data-[collapsible=icon]:!hidden" />

            {/* SQUARE LOGOS */}
            <img src="/images/logo-makesta.png" alt="Logo Makesta" className="h-8 w-auto object-center object-contain hidden group-data-[collapsible=icon]:!block dark:group-data-[collapsible=icon]:!hidden" />
            <img src="/images/logo-makesta-putih.png" alt="Logo Makesta" className="h-8 w-auto object-center object-contain hidden dark:group-data-[collapsible=icon]:!block" />
        </div>
    );
}