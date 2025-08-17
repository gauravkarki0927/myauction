var datas = [
    {
        id: 1,
        name: 'Gaurav Karki',
        class: 'BCA'
    },
    {
        id: 2,
        name: 'Bishal Thapa',
        class: 'BIM'
    },
    {
        id: 3,
        name: 'Barsha Paudel',
        class: 'CSIT'
    }
];

const set = datas.map( datas => ({
    u_id: datas.id,
    u_name: datas.name,
    u_class: datas.class,
})
);
console.log(set);
