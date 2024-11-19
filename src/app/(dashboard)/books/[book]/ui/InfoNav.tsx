import React from "react";

export default function InfoNav({
  selectedTab,
  setSelectedTab,
}: {
  selectedTab: number;
  setSelectedTab: React.Dispatch<React.SetStateAction<number>>;
}) {
  const navItems = [
    { id: 5, title: "نبذة عن الكتاب" },
    { id: 4, title: "تقديم المؤلف" },
    { id: 3, title: "تعاليق القارئين (X)" },
    { id: 2, title: "التفاصيل" },
    { id: 1, title: "المعلومات الأساسيات" },
  ];
  return (
    <nav>
      <ul
        className="flex justify-center gap-3 font-semibold"
        style={{ color: "#1C7775" }}
      >
        {navItems.map((item) => (
          <li
            key={item.id}
            style={{
              borderColor: selectedTab === item.id ? "#1C7775" : "#FFFFFF00",
            }}
            className={`${selectedTab === item.id && ""} border-b-2 transition-all duration-300`}
          >
            <button onClick={() => setSelectedTab(item.id)}>
              {item.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
