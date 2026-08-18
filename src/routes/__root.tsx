import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { I18nProvider, useI18n } from "@/lib/i18n";
import { AmbientMusic } from "@/components/AmbientMusic";
import { AppSplash, LoadingScreen } from "@/components/LoadingScreen";
import { Toaster } from "@/components/ui/sonner";

const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700&family=Marhey:wght@400;600;700&family=Playfair+Display:ital,wght@0,500;0,700;1,500&display=swap";

function NotFoundComponent() {
  const { t } = useI18n();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">{t("not_found")}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{t("not_found_sub")}</p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground"
          >
            {t("go_home")}
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  const { t } = useI18n();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-xl tracking-tight text-foreground">{t("page_error")}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("page_error_sub")}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground"
          >
            {t("try_again")}
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-input bg-background px-5 py-2 text-sm font-medium text-foreground"
          >
            {t("go_home")}
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "لمسة ورد | صالون نسائي فاخر" },
      {
        name: "description",
        content: "صالون لمسة ورد — عناية راقية بالشعر والمكياج والبشرة والأظافر في عمّان.",
      },
      { name: "author", content: "لمسة ورد" },
      { property: "og:title", content: "لمسة ورد | صالون نسائي فاخر" },
      { property: "og:description", content: "تجربة جمال هادئة وأنيقة — احجزي موعدك بسهولة." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "stylesheet", href: FONT_HREF },
      { rel: "icon", href: "/favicon.svg?v=lamsat-ward", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon.ico?v=lamsat-ward", sizes: "any" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png?v=lamsat-ward" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  pendingComponent: LoadingScreen,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <HeadContent />
      </head>
      <body>
        <I18nProvider>{children}</I18nProvider>
        <Scripts />
      </body>
    </html>
  );
}

function AppChrome() {
  const { dir } = useI18n();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const inner = pathname !== "/" && !pathname.startsWith("/admin");

  useEffect(() => {
    document.body.classList.toggle("site-inner", inner);
    return () => document.body.classList.remove("site-inner");
  }, [inner]);

  return (
    <>
      <Toaster position="top-center" dir={dir} richColors />
      {pathname.startsWith("/admin") ? null : <AmbientMusic />}
      {inner ? (
        <div className="site-inner-fx" aria-hidden>
          <div className="orb orb-a" />
          <div className="orb orb-b" />
          <div className="orb orb-c" />
        </div>
      ) : null}
    </>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    document.documentElement.classList.add("scroll-smooth");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AppSplash />
      <AppChrome />
      <Outlet />
    </QueryClientProvider>
  );
}
