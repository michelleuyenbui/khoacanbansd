// Events for the Lịch Sinh Hoạt page (lichsinhhoat.html).
//
// Put every event here, past and future, in any order. The page sorts them and moves
// an event to "Đã qua" by itself the day after its last day (San Diego time).
//
// `date` is the first day (YYYY-MM-DD), or just YYYY-MM while only the month is known.
// `end` is the last day of a multi-day event.
// Optional: `when`, `place`, `address`, `flyer` (an image in assets/sinhhoat/), `topic`,
// `speaker`, `host`, `note`, `contact` ({name, phone, email}), `link` (a page to register),
// `who` for meetings that aren't open to everyone ('Ban Tổ Chức', 'Hội Đồng Song Nguyền').
// After an event: `photo` (a cover picture in assets/sinhhoat/) and `album` (a Google
// Photos album, Drive folder or YouTube link) give it a "Xem hình" button.
(function(){
const CCL = 'Giáo xứ Chúa Chiên Lành';
const CCL_ADDR = '8200 Gold Coast Dr., San Diego, CA 92126';
const CCL_ROOM = 'Phòng học Chúa Chiên Lành hoặc Zoom';
const CDCG = 'Cộng Đồng Công Giáo Việt Nam, Giáo Phận San Diego';
const HDSN = 'Hội Đồng Song Nguyền';
const SAN_RAFAEL = 'Giáo xứ San Rafael (Rancho Bernardo)';
const SAN_RAFAEL_ADDR = '17252 Bernardo Center Drive, San Diego, CA 92128';

const EVENTS = [
// 2025
{date:'2025-12-28',title:'Thánh Lễ Bổn Mạng',photo:'./assets/sinhhoat/bon-mang-2025.jpg',album:'https://photos.google.com/share/AF1QipNNlO9xW1RvXysomCcMA-k6gXrpVSyQ3uKLii9vc2VRoUMtcf_yBbZ885McSfzm4g?key=WjBRSnN0cHdsbTRJU1hKUi1yUWx1a2dlZ1NCanpB'},
// 2026
{date:'2026-01-13',title:'Buổi Họp Đầu Tiên Ban Điều Hành 2026–2028, Mừng Tuổi Cha Linh Nguyền',when:'7:30 – 9:30 PM',place:'Phòng học Chúa Chiên Lành',address:CCL_ADDR,who:HDSN},
{date:'2026-02-14',title:'Marriage Anniversary Mass',when:'11:00 AM',place:'Church of the Resurrection, Escondido',host:'Giáo Phận San Diego'},
{date:'2026-02-20',title:'Thánh Lễ Giao Thừa',when:'7:00 – 8:30 PM',place:'Nhà thờ Chúa Chiên Lành',address:CCL_ADDR,host:CDCG},
{date:'2026-02-21',title:'Lễ Gia Tiên: tưởng nhớ Ông Bà Tổ Tiên và các cha cố Linh Nguyền',when:'11:00 AM',place:'Nghĩa trang Holy Cross',host:CDCG},
{date:'2026-02-22',title:'Mừng Tết Nguyên Đán, Chúc Tuổi Cha Linh Nguyền',when:'5:00 – 8:00 PM',place:'Our Lady of Perpetual Help Catholic Church, Lakeside'},
{date:'2026-03-03',title:'Họp Hội Đồng Song Nguyền: chuẩn bị Họp Song Nguyền',when:'8:00 – 10:00 PM',place:CCL_ROOM,address:CCL_ADDR,who:HDSN},
{date:'2026-03-29',title:'Họp Song Nguyền 1',when:'3:00 – 6:00 PM',place:SAN_RAFAEL,address:SAN_RAFAEL_ADDR},
{date:'2026-04-28',title:'Họp Hội Đồng Song Nguyền: chuẩn bị Trại Hè',when:'8:00 – 10:00 PM',place:CCL_ROOM,address:CCL_ADDR,who:HDSN},
{date:'2026-05-23',title:'Lễ Chúa Thánh Thần Hiện Xuống Đa Sắc Tộc',host:'Giáo Phận San Diego'},
{date:'2026-05-29',end:'2026-05-31',title:'Trại Hè (Camping/Bonding Time)',when:'2 ngày 2 đêm',place:'Lake Jennings, Lakeside',who:'Ban Điều Hành và Liên Gia Trưởng/Phó'},
{date:'2026-05-30',title:'Camp Oliver Clean-Up',photo:'./assets/sinhhoat/camp-oliver.jpg',album:'https://photos.google.com/share/AF1QipMV0fQNDwsFHO14Y6CDiEKWnZ27bKfYp2oymAmq7oGqNhGWSlB5a-JjKtjt3DIkhw?key=TnpWeDI0V2p3N2RHc2hhcVFBM3BFcDBlc2t0ak53'},
{date:'2026-06-02',title:'Họp Hội Đồng Song Nguyền: chuẩn bị Họp Song Nguyền',when:'8:00 – 10:00 PM',place:CCL_ROOM,address:CCL_ADDR,who:HDSN},
{date:'2026-06-28',title:'Họp Song Nguyền 2',when:'3:00 – 6:00 PM'},
{date:'2026-08-04',title:'Họp Hội Đồng Song Nguyền: chuẩn bị Picnic',when:'8:00 – 10:00 PM',place:CCL_ROOM,address:CCL_ADDR,who:HDSN},
{date:'2026-08-07',title:'Khóa Tĩnh Huấn Đặc Sủng Chương Trình',place:'Mission San Luis Rey, Oceanside',address:'4050 Mission Ave., Oceanside, CA 92057'},
{date:'2026-08-21',title:'Tiệc Gây Quỹ Cộng Đồng (Hiệp Nhất 4)',when:'6:30 PM',place:'Diamond Palace',host:CDCG},
{date:'2026-08-30',title:'Picnic của Chương Trình',when:'9:00 AM – 4:00 PM'},
{date:'2026-09-08',title:'Họp Hội Đồng Song Nguyền: chuẩn bị Dạ Tiệc',when:'8:00 – 10:00 PM',place:CCL_ROOM,address:CCL_ADDR,who:HDSN},
{date:'2026-09-25',title:'Dạ Tiệc Tất Cả Vì Yêu 10',when:'6:00 – 11:00 PM',photo:'./assets/sinhhoat/tat-ca-vi-yeu.jpg',album:'https://photos.google.com/share/AF1QipM5z7bOtNAGKjUTWh7aob2gQIPalsDOi9irBCEPqYgcFNlvQL9YIMIxVV7PZ4FEZA?key=b2dLeGdvc25VeWpOcjVESGl0S0hjUDU5c0VONTl3'},
{date:'2026-10-06',title:'Họp Hội Đồng Song Nguyền: chuẩn bị Họp Song Nguyền',when:'8:00 – 10:00 PM',place:CCL_ROOM,address:CCL_ADDR,who:HDSN},
{date:'2026-10-25',title:'Họp Song Nguyền 3 (hoặc Tĩnh Tâm, Hội Thảo)',when:'3:00 – 6:00 PM',place:SAN_RAFAEL,address:SAN_RAFAEL_ADDR},
{date:'2026-11-12',end:'2026-11-14',title:'Tĩnh Tâm Mùa Vọng',topic:'Định Mệnh Trong Tên Gọi Là Ở Cùng',when:'7:00 PM mỗi tối',place:CCL,address:CCL_ADDR,speaker:'Cha Giuse Nguyễn Trọng Tước, SJ (Nguyễn Tầm Thường)',host:CDCG,note:'Kính mời cộng đồng dân Chúa cùng đến đông đủ và tham dự hai buổi tĩnh tâm, để thăng tiến đời sống thiêng liêng và đón mừng Mùa Vọng sắp đến.',flyer:'./assets/sinhhoat/tinh-tam-mua-vong-2026.jpg'},
{date:'2026-11-22',title:'Lễ Các Thánh Tử Vì Đạo Việt Nam',when:'2:30 PM',place:'Nhà thờ Chúa Chiên Lành',address:CCL_ADDR,host:CDCG},
{date:'2026-12-01',title:'Họp Hội Đồng Song Nguyền: chuẩn bị Lễ Bổn Mạng',when:'8:00 – 10:00 PM',place:CCL_ROOM,address:CCL_ADDR,who:HDSN},
{date:'2026-12-27',title:'Thánh Lễ Mừng Bổn Mạng Chương Trình',when:'1:00 – 9:00 PM',place:SAN_RAFAEL,address:SAN_RAFAEL_ADDR,contact:{name:'Bảo-Phước',phone:'619-337-4338',email:'baophuocsd@gmail.com'}},
// 2027: Khóa Căn Bản planning
{date:'2027-03',title:'Buổi Họp Ban Tổ Chức: giới thiệu các Ban',when:'6:30 – 9:30 PM',who:'Ban Tổ Chức'},
{date:'2027-04',title:'Buổi Hồi Tâm 1',when:'3:00 – 6:00 PM',who:'Ban Tổ Chức'},
{date:'2027-06',title:'Buổi Hồi Tâm 2',when:'6:30 – 9:30 PM',who:'Ban Tổ Chức'},
{date:'2027-07',title:'Buổi Tổng Dợt 1',when:'8:00 AM – 5:00 PM',who:'Ban Tổ Chức'},
{date:'2027-08',title:'Buổi Hồi Tâm 3',when:'6:30 – 9:30 PM',who:'Ban Tổ Chức'},
{date:'2027-09',title:'Buổi Tổng Dợt 2',when:'8:00 AM – 5:00 PM',who:'Ban Tổ Chức'},
{date:'2027-10-29',end:'2027-10-31',title:'Khóa Căn Bản',when:'5:00 PM Thứ Sáu – 5:00 PM Chúa Nhật',place:'Mission San Luis Rey Retreat Center',address:'4050 Mission Ave., Oceanside, CA 92057',link:'index.html#dangky'},
{date:'2027-11',title:'Chào Đón Song Nguyền Mới',when:'4:00 – 9:00 PM'},
];

const PDF = 'files/lich-sinh-hoat.pdf';
const WEEKDAYS = ['Chúa Nhật','Thứ Hai','Thứ Ba','Thứ Tư','Thứ Năm','Thứ Sáu','Thứ Bảy'];

const todayISO = () => new Date().toLocaleDateString('en-CA',{timeZone:'America/Los_Angeles'});
const parts = iso => iso.split('-').map(Number);
const weekday = iso => { const [y,m,d] = parts(iso); return new Date(Date.UTC(y,m-1,d)).getUTCDay(); };

// Written out the site's way: "Thứ Năm, ngày 12 tháng 11 năm 2026".
function dateText(ev){
  const [y,m,d] = parts(ev.date);
  if (!d) return 'Tháng ' + m + ' năm ' + y + ' (ngày sẽ thông báo)';
  if (!ev.end) return WEEKDAYS[weekday(ev.date)] + ', ngày ' + d + ' tháng ' + m + ' năm ' + y;
  const [ey,em,ed] = parts(ev.end);
  return WEEKDAYS[weekday(ev.date)] + ' ngày ' + d + (m===em ? '' : ' tháng ' + m) + ' – ' + WEEKDAYS[weekday(ev.end)] + ' ngày ' + ed + ' tháng ' + em + ' năm ' + ey;
}

function prepare(ev, today){
  const [y,m,d] = parts(ev.date);
  const last = ev.end || ev.date;
  const isPast = d ? last < today : ev.date < today.slice(0,7);
  return {...ev,
    id: ev.date + '-' + ev.title.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''),
    y, m, d: d || null,
    monthOnly: !d,
    badgeBig: d ? String(d) + (ev.end ? '–' + parts(ev.end)[2] : '') : String(y),
    dateText: dateText(ev),
    isPast,
    // "Song Nguyền" never splits, so a narrow column wraps it as "Hội Đồng / Song Nguyền".
    audience: (ev.who || 'Mọi người').replace(/Song Nguyền/g, 'Song Nguyền'),
    when: ev.when || '',
    // The last two words stay together, so a long name wraps as
    // "Giáo xứ San Rafael / (Rancho Bernardo)" instead of leaving one word alone.
    place: (ev.place || (d && isPast ? '' : 'Sẽ thông báo')).replace(/ (\S+)$/, ' $1'),
    hasWhen: !!ev.when,
    hasPlace: !!ev.place || !(d && isPast),
    hasFlyer: !!ev.flyer,
    hasAlbum: !!ev.album,
    hasAddress: !!ev.address,
    // "8200 Gold Coast Dr." and "San Diego, CA 92126", so the city starts its own line.
    street: ev.address ? ev.address.split(', ')[0] : '',
    city: ev.address ? ev.address.split(', ').slice(1).join(', ') : '',
    hasTopic: !!ev.topic,
    map: ev.address ? 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(ev.address) : '',
    sortKey: d ? ev.date : ev.date + '-00',
  };
}

// Every event, oldest first, each marked isPast or not.
function all(today){
  today = today || todayISO();
  return EVENTS.map(ev => prepare(ev, today)).sort((a,b) => a.sortKey.localeCompare(b.sortKey));
}
window.LICH = {PDF,todayISO,all};
})();
