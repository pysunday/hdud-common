// 语言切换
import React from "react"
import clsx from 'clsx';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from "@heroui/dropdown";
import { Button } from "@heroui/button";

const langMap = {
  zh: '简体中文',
  'zh-hant': '繁體中文',
  en: 'English',
  ar: 'عربي',
  de: 'Deutsch',
  ko: '한국인',
  ru: 'Русский',
  fr: 'Français',
  es: 'Español',
  ja: '日本語',
}

export default function LangToggle({ className, langs=Object.keys(langMap), locale = 'zh' }) {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([locale]));
  const langChange = (item) => {
    if (item.disabled) return
    const re = new RegExp(`^\/(zh-hant|${Object.keys(langMap).join('|')})`)
    window.location.pathname = `${item.path}${window.location.pathname.replace(re, '')}`;
  }
  const menus = langs.map((name) => ({
    name,
    label: langMap[name],
    disabled: locale === name,
    path: name === 'zh' ? '' : `/${name}`
  }))

  return (
    <Dropdown className="text-inherit">
      <DropdownTrigger>
        <Button variant="ghost" className="text-inherit text-2xl">
          <span className="icon-[material-symbols--translate]" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        selectedKeys={selectedKeys}
        selectionMode="single"
        variant="flat"
        onSelectionChange={setSelectedKeys}
      >
        {
          menus.map(it =>
            <DropdownItem
              key={it.name}
              onClick={() => langChange(it)}
              disabled={it.disabled}
            >
              {it.label}
            </DropdownItem>
          )
        }
      </DropdownMenu>
    </Dropdown>
  )
}
