ui组件库：https://daisyui.com/
框架：https://alpinejs.dev/


# iconify

https://icon-sets.iconify.design/?query=


# react

```bash
npm install @iconify-json/mdi @iconify/react
```

```javascript
import { Icon } from '@iconify/react';
import homeIcon from '@iconify-json/mdi/icons/home.json'; 

<Icon icon="mdi:home" />
<Icon icon={homeIcon} />
```

# astro

```bash
npx astro add astro-icon
npm install @iconify-json/mdi
```

```javascript
import { Icon } from 'astro-icon/components'
<Icon name="mdi:home" />
```

# tailwind

```bash
npm i -D @iconify/tailwind @iconify-json/mdi
```

```tailwind
@plugin "@iconify/tailwind4";
```

```html
<span class="icon-[mdi-light--home]"></span>
```
