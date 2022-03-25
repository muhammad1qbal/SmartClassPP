
const rupiah = (number)=>{
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR"
  }).format(number);
}

// rupiah(20000) // "Rp 20.000,00"
// console.log(rupiah(20000));

module.exports = rupiah