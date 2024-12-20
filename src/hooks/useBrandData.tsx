import { createContext, useContext, useState, ReactNode } from "react";

export type BrandData = {
  id: string;
  name: string;
  iconUrl: string;
};

const brandData = [
    {
        id: "dailygem",
        name: "Daily Gem",
        iconUrl: "https://dailygem.com/cdn/shop/files/020724_GEM_Site_Favicon2.png?crop=center&height=32&v=1707348248&width=32",
    },
    {
        id: "trycreate",
        name: "Try Create",
        iconUrl: "https://trycreate.co/cdn/shop/files/create_favicon.png?crop=center&height=32&v=1663229938&width=32",
    },
    {
        id: "safiyaa",
        name: "Safiyaa",
        iconUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAC4ElEQVR4Aa3VA6xcQRiG4VVtBbVt241V27Zt27Zt27Ztt1FtTN8k/ySTyd7Tk3v2S57V7Og/8kUoQehUxza8hxKPMA05oeOP9OT5cAkKP7AP87AEF6HEmEguQk9eCQp/0RmJYCcdJkJhIzwnIO/ZZeK3yGbtLiDMFIfCCEQkh6GQV77HQRB+BEVAxJD/lMR7ZPG6+7JQGAU3MRcxCRO9HvspUEiKBGiCMZiBWdI+AOWhE5L3TNjutQKn8FImWYfeqIxcMkFh1MQ0rJE2nRhY7rUCZ6DQHiE4JStWYSB05vqs+IVTdHsSfMYZq7wB+A1BoTMVw+TzWqukVpmdMxcKJ13cVAJW+0DsQBd7otzIh5i6YxSlbyaDnMB1l+dLCHlQCOPwAcl8kjJSjplSovWoGcUi/FiNJLiEay4mry7jTxdV0BMt9J1pFzJDJ5l0qGsMpAcrgtny+S6u/GfyWjJWCpjJhgU+acxplEmXOSE2Iq5V/kbo6rQAI3GwScbSYwSMtiXwbTAa7ZvFWJTV162890FNpwUYk5THWKu/mXkBXv7Il78IFwUzMfEDbqNgx29udD3iGSs3D8GmMIdgOorL5ztOh0DG3YT4egyhr7gVusy1YSYF1qOWVb5UWGOU+JaLk7Cu9EkKnSzYiRLwpcVKVMMozMMGVDdKrjPfOP6OC7BKXQvrpXqzsQZlfEZ24yvqIhnCZQpG6lK6XIBZidjIi5x223C0k8aV6ILyKIiSaIVN6GJ2dLsASdDpVr/V+EN8NMJYTMEEdEIaq6R+9wtwftiZT6SQ+13YC/CWrdbAAQT1u/BHsZvnOG6WNDrZiwzmzlyeVJmhMNmsUHQyGRPtS84hMeR9GBRKe61AFrxHMT2BQ8n15HmgcAgRyUj8QVEYCXsOZMNbKGT3unszm6EwEWlgJxE6QYnKxiI9xdzdeChxHsuwAPvwHQqXkd/z5A6LyINpuIe/UHiLLagJErnJ/wHqkaLLAI3wiwAAAABJRU5ErkJggg==",
    }
];

interface BrandDataContextType {
  brands: BrandData[];
  activeBrand: BrandData | null;
  setActiveBrandById: (brandId: string) => void;
}

const BrandDataContext = createContext<BrandDataContextType>({
  brands: [],
  activeBrand: null,
  setActiveBrandById: () => {},
});

export function BrandDataProvider({ children }: { children: ReactNode }) {
  const [brands] = useState<BrandData[]>(brandData);
  const [activeBrand, setActiveBrand] = useState<BrandData | null>(null);

  const setActiveBrandById = (brandId: string) => {
    const newBrand = brands.find((brand) => brand.id === brandId);
    setActiveBrand(newBrand || null);
  };

  return (
    <BrandDataContext.Provider
      value={{
        brands,
        activeBrand,
        setActiveBrandById,
      }}
    >
      {children}
    </BrandDataContext.Provider>
  );
}

export function useBrandData() {
  const context = useContext(BrandDataContext);
  if (context === undefined) {
    throw new Error("useBrandData must be used within a BrandDataProvider");
  }
  return context;
} 