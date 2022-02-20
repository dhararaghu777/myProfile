export const getImageUrl=(item)=>{
    let url="https://res.cloudinary.com/raghudara/image/upload/v1644142530/coding_k0ijvu.png"

    let langName= item.skillName.toLowerCase()
    if(langName==='c')
        url="https://res.cloudinary.com/raghudara/image/upload/v1643452597/letter-c_wspand.png"
    else if(langName==='c++')
        url="https://res.cloudinary.com/raghudara/image/upload/v1643452597/c-_ox89z4.png"
    else if(langName === 'java')
        url="https://res.cloudinary.com/raghudara/image/upload/v1643452598/java_egu9us.png"
    else if(langName ==='python')
        url="https://res.cloudinary.com/raghudara/image/upload/v1643452598/python_wws6kq.png"
    else if(langName ==='javascript')
        url="https://res.cloudinary.com/raghudara/image/upload/v1643452598/js_mdkzvq.png"
    else if(langName.includes('node'))
        url="https://res.cloudinary.com/raghudara/image/upload/v1644145315/node-js_hetwtb.png"
    else if(langName ==='php')
        url="https://res.cloudinary.com/raghudara/image/upload/v1644145315/php_as58su.png"
    else if(langName ==='html')
        url="https://res.cloudinary.com/raghudara/image/upload/v1643452597/html-5_x5azx7.png"
    else if(langName ==='css')
        url="https://res.cloudinary.com/raghudara/image/upload/v1643452597/css_w9p0g4.png"
    else if(langName ==='sql')
        url="https://res.cloudinary.com/raghudara/image/upload/v1643452596/database_yyaztc.png"
    else if(langName ==='mysql')
        url='https://res.cloudinary.com/raghudara/image/upload/v1644145315/mysql_cskt7e.png'
    else if(langName ==='mongodb')
        url="https://res.cloudinary.com/raghudara/image/upload/v1644145317/mongodb_lkxgij.png"
    else if(langName.includes('react'))
        url="https://res.cloudinary.com/raghudara/image/upload/v1644159996/reactjs_ueepxp.png"
    else if(langName.includes('angular'))
        url="https://res.cloudinary.com/raghudara/image/upload/v1644145318/angular_rth7o4.png"
    else if(langName=='sap')
        url="https://res.cloudinary.com/raghudara/image/upload/v1644145317/sap_tujn6r.png"


    return url
}