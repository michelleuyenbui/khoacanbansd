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
| `lichsu.html` | Lịch Sử: history and founder documents |
| `liengia.html` | Liên Gia: the seven Liên Gia and their Song Nguyền |
| `tailieu.html` | Tài Liệu: documents, the founder's books and prayers |
| `detaihopliengia.html` | Đề Tài Họp Liên Gia: meeting topics |
| `lienlac.html` | Liên Lạc: contact form |

Shared files:

- `tokens.css`: colors, fonts and the footer used by every page. Change a color here, not in the pages.
- `lang-toggle.js`: the language button in the header. It shows the language a click switches to.
- `nav-toggle.js`: the menu button on phones.
- `email-copy.js`: copies an email address when someone clicks it.
- `hero-sky.js`: the moving clouds behind the home page title.
- `assets/`: images. `assets/og-image.jpg` is the picture shown when a link is shared.
- `files/`: the PDFs and Word files people download. Each page links to its own copy here, not to Google Drive.

The header and footer are copied into every page, so a change to a menu link
has to be made in all seven files.

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
- **Documents** (`lichsu.html`, `tailieu.html` and `detaihopliengia.html`,
  `DOCS`): put the file in `files/` (meeting topics go in `files/de-tai/`), then
  add a row with its path in `url`, for example
  `{title:'Giữ Lửa Gia Đình',url:'files/de-tai/giu-lua-gia-dinh.pdf'}`.
  The row gets a download button. A link to another page gets a "Xem"
  button instead, and a row without `url` shows "Sắp có". Rows can go in any order:
  each page sorts groups and documents A–Z. Keep file names lowercase
  without accents or spaces. Files over 50 MB are too big for GitHub; link to
  them instead.
- **Lịch Sinh Hoạt and the registration form**: replace
  `files/lich-sinh-hoat.pdf` or `files/don-ghi-danh-khoa-can-ban.pdf` with the
  new PDF under the same name. Every page's menu already links there.
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
