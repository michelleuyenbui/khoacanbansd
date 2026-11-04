# khoacanbansd

Website of Chương Trình Thăng Tiến Hôn Nhân Gia Đình, Giáo Phận San Diego,
live at <https://khoacanbansd.org>. Vercel deploys the `main` branch.

It is a plain static site: no build step, no server. Each page is an HTML file
that `support.js` (with the React copy in `vendor/`) renders in the browser.

## Pages

| File | Page |
| --- | --- |
| `index.html` | Home: introduction, next Khóa Căn Bản, FAQ, events |
| `about.html` | Tổ Chức: mission, history, Ban Điều Hành |
| `liengia.html` | Liên Gia: the seven Liên Gia and their Song Nguyền |
| `tailieu.html` | Tài Liệu: documents and prayers |
| `detaihopliengia.html` | Đề Tài Họp Liên Gia: meeting topics |
| `lienlac.html` | Liên Lạc: contact form |

Shared files:

- `tokens.css`: colors, fonts and the footer used by every page. Change a color here, not in the pages.
- `lang-toggle.js`: the VI/EN button in the header.
- `nav-toggle.js`: the menu button on phones.
- `email-copy.js`: copies an email address when someone clicks it.
- `hero-sky.js`: the moving clouds behind the home page title.
- `assets/`: images. `assets/og-image.jpg` is the picture shown when a link is shared.

The header and footer are copied into every page, so a change to a menu link
has to be made in all six files.

## Updating content

Most content is plain text in the page. Lists that change often sit in a
`<script type="text/x-dc">` block at the bottom of the page, and each one has a
comment explaining how to edit it.

- **Events** (`index.html`, `EVENTS`): add one line per event. When an event's
  date has passed, it moves to "Sinh hoạt vừa qua" by itself. Add `photo` and
  `link` to give it a cover picture and an album link.
- **Next Khóa Căn Bản** (`index.html`, `NEXT_CLASS`): the registration box and
  the FAQ answers both read from here. Write `dates` out in full, for example
  `Thứ Sáu ngày 29 – Chúa Nhật ngày 31 tháng 10 năm 2027`.
- **Documents** (`tailieu.html`, `DOCS`) and **meeting topics**
  (`detaihopliengia.html`, `DOCS`): paste a link into `url`. Without a link,
  the row shows "Sắp có".
- **Ban Điều Hành photos**: `assets/bandieuhanh/<name>.jpg`.
- **Liên Gia photos**: `assets/liengia/<liên-gia-id>.jpg`.

Write dates out in words: "Ngày 13 tháng 6 năm 1987", not 13/6/1987.

## Contact form

The site has no server, so `lienlac.html` sends messages through
[FormSubmit](https://formsubmit.co) to khoacanbansd@gmail.com. The first time
the form is used from a new address, FormSubmit emails that inbox an
activation link. Messages arrive only after someone clicks it.

## Viewing locally

From this folder, run `python3 -m http.server` and open
<http://localhost:8000>. Opening the files directly (file://) does not work in
some browsers.
