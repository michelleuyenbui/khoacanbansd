// The next Khóa Căn Bản, read by the home page (index.html) and the Khóa Căn Bản page
// (khoacanban.html). Change it here and both pages update.
//
// `date` is the first day, `end` the last (YYYY-MM-DD); after `end` the pages say the
// next date is coming soon until this is updated. Write `dates` out in full, for example
// 'Thứ Sáu ngày 29 – Chúa Nhật ngày 31 tháng 10 năm 2027'.
(function(){
const NEXT_CLASS = {date:'2027-10-29',end:'2027-10-31',dates:'Thứ Sáu ngày 29 – Chúa Nhật ngày 31 tháng 10 năm 2027',when:'5:00 PM Thứ Sáu – 5:00 PM Chúa Nhật',place:'Mission San Luis Rey Retreat Center',address:'4050 Mission Ave., Oceanside, CA 92057',map:'https://www.google.com/maps/search/?api=1&query=4050+Mission+Ave+Oceanside+CA+92057'};
const FORM = 'files/don-ghi-danh-khoa-can-ban.pdf';
// Who takes the forms and payments, as printed on the form.
const CONTACT = {name:'Thu Nguyễn',phone:'(858) 997-3780',tel:'+18589973780',email:'thunguyensd@yahoo.com'};
const WHAT = {id:'what',q:'Khóa căn bản là gì?',a:'Khóa căn bản là khóa Tĩnh Tâm cuối tuần mà quý anh chị có thể tham dự để có dịp:',list:[
'Học hỏi khám phá những bí quyết làm tăng thêm hạnh phúc gia đình.',
'Tìm hiểu những phương thức giáo dục để cải tiến mối quan hệ giữa cha mẹ và con cái.',
'Gặp gỡ kết bạn để củng cố đức tin và nâng đỡ nhau vượt qua những khó khăn trong cuộc sống.']};

const todayISO = () => new Date().toLocaleDateString('en-CA',{timeZone:'America/Los_Angeles'});

// The class with its date badge filled in, or null once it is over.
function next(today){
  today = today || todayISO();
  if (NEXT_CLASS.end < today) return null;
  const [y,m,d] = NEXT_CLASS.date.split('-').map(Number);
  const ed = Number(NEXT_CLASS.end.split('-')[2]);
  const cut = NEXT_CLASS.address.indexOf(', ');
  const days = d===ed ? String(d) : d+'–'+ed;
  // `month` fits the home page's small badge; `monthFull` and `rangeLong` are the
  // Khóa Căn Bản page's date tile, the second one on phones.
  return {...NEXT_CLASS,month:'THG '+m,monthFull:'Tháng '+m,day:d,days,year:y,dateLong:'Ngày '+d+' tháng '+m,
    rangeLong:'Ngày '+days+' tháng '+m+' năm '+y,
    street:NEXT_CLASS.address.slice(0,cut),city:NEXT_CLASS.address.slice(cut+2)};
}

// The questions in order. The date and place answers come from NEXT_CLASS.
// `link` puts a link after `a`; `list` adds a numbered list under it. `id` lets a page skip one.
function faq(today){
  const c = next(today);
  const [,cm,cd] = NEXT_CLASS.date.split('-').map(Number);
  const [ey,em,ed] = NEXT_CLASS.end.split('-').map(Number);
  return [
    WHAT,
    {id:'when',q:'Khóa căn bản bắt đầu ngày nào?',a:c
      ? 'Khóa sẽ bắt đầu từ chiều thứ Sáu ngày '+cd+(cm===em?'':' tháng '+cm)+' đến Chúa Nhật ngày '+ed+' tháng '+em+' năm '+ey+'.'
      : 'Ngày khóa kế tiếp sẽ được cập nhật sớm.'},
    {id:'where',q:'Khóa căn bản sẽ tổ chức ở đâu?',a:'Tại '+NEXT_CLASS.place+', ',link:{href:NEXT_CLASS.map,text:NEXT_CLASS.address}},
    {id:'who',q:'Ai sẽ được tham dự khóa?',a:'Tất cả những cặp vợ chồng mong muốn hôn nhân và gia đình mình tốt đẹp hơn, yêu thương nhau thêm trong tình yêu Chúa.'},
    {id:'fee',q:'Lệ phí của khóa là bao nhiêu?',a:'Lệ phí mỗi cặp là TBD, bao gồm chỗ ngủ lại đêm, những bữa ăn và tài liệu dùng trong khóa.'},
    {id:'alone',q:'Tôi dự khóa một mình được không?',a:'Hoàn cảnh của mỗi người khác nhau nên cần sự đồng ý của cha Linh Nguyền.'},
  ];
}
// Questions only the Khóa Căn Bản page asks, answered from the registration form.
const FORM_FAQ = [
  {id:'language',q:'Khóa dùng tiếng Việt hay tiếng Anh?',a:'Trong đơn ghi danh, xin cho biết hai bạn hiểu tiếng Việt, tiếng Anh hay cả hai ngôn ngữ.'},
  {id:'help',q:'Nếu chúng tôi cần giúp đỡ đặc biệt?',a:'Xin ghi những điều cần giúp đỡ hoặc khuyết tật vào đơn ghi danh.'},
  {id:'cancel',q:'Nếu chúng tôi không thể tham dự?',a:'Vì lý do gì không thể tham dự khóa được, xin liên lạc với Thu Nguyễn hoặc Ban Tổ Chức. Hoàn trả: 100% nếu báo trước 1 tháng, 50% nếu báo trước 2 tuần, tính tới ngày mở khóa.'},
];
window.KHOA = {FORM,CONTACT,FORM_FAQ,todayISO,next,faq};
})();
