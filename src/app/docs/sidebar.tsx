"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { NavGroup, NavItem } from "@/lib/docs";

function SidebarGroup({ group, pathname }: { group: NavGroup; pathname: string }) {
  // 检查当前组是否包含活动路径
  const isActiveGroup = group.items.some((item) => pathname === item.href);
  
  // 默认展开所有，或者只展开当前活动的组。这里选择默认展开所有，用户可手动折叠
  // 或者：如果用户想要折叠功能，可能是因为菜单太长。
  // 策略：初始化时，如果有活动项则展开，否则默认也展开（或者默认折叠？通常文档站默认展开第一级）
  // 让我们采用：默认展开。
  const [isOpen, setIsOpen] = useState(true);

  // 如果路径变化且该组包含当前路径，自动展开
  useEffect(() => {
    if (isActiveGroup) {
      setIsOpen(true);
    }
  }, [pathname, isActiveGroup]);

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full mb-2 text-sm font-semibold text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
      >
        <span>{group.title}</span>
        {isOpen ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="space-y-1 ml-2 border-l border-gray-200 dark:border-gray-800 pl-2">
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block py-1.5 px-3 rounded-md text-sm transition-colors ${
                    pathname === item.href
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  }`}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Sidebar({ groups }: { groups: NavGroup[] }) {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-gray-200 dark:border-gray-800 h-[calc(100vh-5rem)] sticky top-20 overflow-y-auto px-6 py-8">
      <nav>
        {groups.map((group) => (
          <SidebarGroup key={group.title} group={group} pathname={pathname} />
        ))}
      </nav>
    </aside>
  );
}
