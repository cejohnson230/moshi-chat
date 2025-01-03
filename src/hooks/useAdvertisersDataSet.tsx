import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useBrandData } from "./useBrandData";

export type AdvertisersDataSet = {
  id: string;
  brandId: string;
  adContent: {
    imageUrl: string;
    caption: string;
    callToAction: string;
    checkoutUrl: string;
  };
  productDetails: {
    name: string;
    originalPrice: number;
    discountAmount: number;
    description: string;
    variants: string[];
  };
  metadata?: {
    adPlacement: string;
    targetAudience: string[];
    adObjective: string;
    campaignType: string;
  };
};

const ads = [
    {
    id: "ad_001",
    brandId: "dailygem",
    adContent: {
      imageUrl: "/assets/gembite.jpg",
      caption:
        "Fuel your day naturally 🌱. Meet GEM Bites – a bite-sized powerhouse of vitamins and superfoods.",
      callToAction: "Reply and save 15% on your first order!",
      checkoutUrl: "https://dailygem.com/products/the-gem-bite-citrus-ginger-1?discount=search30&variant=43171118547126",
    },
    productDetails: {
      name: "GEM Bites",
      originalPrice: 39.99,
      discountAmount: 20, //in percentage
      description:
        "GEM Bites are nutrient-dense, plant-based bites that provide essential vitamins and minerals in one delicious chew.",
      variants: ["Cacao", "Lemon", "Cinnamon"],
    },
    metadata: {
      adPlacement: "Instagram Story",
      targetAudience: [
        "Health-conscious adults",
        "Plant-based eaters",
        "Busy professionals",
      ],
      adObjective: "Brand Awareness",
      campaignType: "First Order Promotion",
    },
  },
  {
    id: "ad_002",
    brandId: "trycreate",
    adContent: {
      imageUrl: "/assets/tryCreateGummies.jpg",
      caption:
        "Elevate your performance 🏋️. CREATE Creatine is pure, effective, and made for serious athletes.",
      callToAction: "Reply to buy with 15% off",
      checkoutUrl: "https://trycreate.co/products/creatine-monohydrate-gummies-1?variant=51615847252340&selling_plan=691702104436",
    },
    productDetails: {
      name: "CREATE Creatine Monohydrate",
      originalPrice: 29.99,
      discountAmount: 15, //in percentage
      description:
        "A clean, high-quality creatine supplement to enhance strength, endurance, and recovery.",
      variants: ["Watermelon", "Sour Green"],
    },
    metadata: {
      adPlacement: "Instagram Story",
      targetAudience: ["Fitness enthusiasts", "Athletes", "Gym-goers"],
      adObjective: "Conversions",
      campaignType: "Product Launch",
    },
  },
  {
    id: "ad_003",
    brandId: "safiyaa",
    adContent: {
      imageUrl: "/assets/safiyaa_dress.jpg",
      caption:
        "Elegance redefined ✨. Discover the timeless Safiyaa dress collection for your special moments.",
      callToAction: "Explore Now",
      dealText: "reply for 15% off on your first order",
      checkoutUrl: "https://www.safiyaa.com/products/santina-long-dresses-in-black?_pos=21&_sid=1ab8af539&_ss=r",
    },
    productDetails: {
      name: "Safiyaa Signature Dress",
      originalPrice: 1200,
      discountAmount: 10, //in percentage
      description:
        "A beautifully tailored, luxury dress that combines modern design with timeless elegance.",
      variants: ["Black", "Navy Blue", "Emerald Green"],
    },
    metadata: {
      adPlacement: "Instagram Story",
      targetAudience: [
        "Luxury shoppers",
        "Fashion enthusiasts",
        "Event attendees",
      ],
      adObjective: "Engagement",
      campaignType: "Limited-Time Offer",
    },
  },
];

interface AdvertisersDataSetContextType {
  dataSets: AdvertisersDataSet[];
  activeDataSet: AdvertisersDataSet;
  setActiveDataSet: (dataSet: AdvertisersDataSet) => void;
  setActiveDataSetById: (dataSetId: string) => void;
}

const AdvertisersDataSetContext = createContext<AdvertisersDataSetContextType | undefined>(undefined);

export function AdvertisersDataSetProvider({ children }: { children: ReactNode }) {
  const { setActiveBrandById } = useBrandData();
  const [dataSets] = useState<AdvertisersDataSet[]>(ads);
  const [activeDataSet, setActiveDataSet] = useState<AdvertisersDataSet>(ads[0]);

  useEffect(() => {
    if (activeDataSet) {
      setActiveBrandById(activeDataSet.brandId);
    }
  }, []);

  const handleSetActiveDataSet = (dataSet: AdvertisersDataSet) => {
    setActiveDataSet(dataSet);
    setActiveBrandById(dataSet.brandId);
  };

  const setActiveDataSetById = (dataSetId: string) => {
    const newDataSet = dataSets.find((ds) => ds.id === dataSetId);
    if (newDataSet) {
      handleSetActiveDataSet(newDataSet);
    }
  };

  return (
    <AdvertisersDataSetContext.Provider
      value={{
        dataSets,
        activeDataSet,
        setActiveDataSet: handleSetActiveDataSet,
        setActiveDataSetById,
      }}
    >
      {children}
    </AdvertisersDataSetContext.Provider>
  );
}

export function useAdvertisersDataSet() {
  const context = useContext(AdvertisersDataSetContext);
  if (context === undefined) {
    throw new Error("useAdvertisersDataSet must be used within a AdvertisersDataSetProvider");
  }
  return context;
}

