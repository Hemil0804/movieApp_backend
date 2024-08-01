const {
    PAGINATION_LIMIT,
    APP_URL,
    DELETED_STATUS,
} = require("../../config/key");
require("dotenv").config();
const path = require("path");
const userModel = require("../models/user.model");
const ObjectId = require('mongoose').Types.ObjectId;


const generate32BitRandomString = async(length) => {
    const chars =
        "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
    const randomArray = Array.from({ length: length },
        (v, k) => chars[Math.floor(Math.random() * chars.length)]
    );

    const randomString = randomArray.join("");
    return randomString;
}

module.exports = {
    checkPassword:async(value) => {
        let conditionsMet = 0

        // Check for uppercase letter
        if (/[A-Z]/.test(value)) {
            conditionsMet++
        }

        // Check for lowercase letter
        if (/[a-z]/.test(value)) {
            conditionsMet++
        }

        // Check for number
        if (/\d/.test(value)) {
            conditionsMet++
        }

        // Check for special character
        if (/[!@#$%^&*()\-_=+{};:,<.>]/.test(value)) {
            conditionsMet++
        }
        const isLengthValid = value.length >= 6
        console.log('isLengthValid----------',isLengthValid)
        console.log('conditionsMet----------',conditionsMet)
        console.log('&&&&&&conditionsMet >= 3 && isLengthValid----------',conditionsMet >= 3 && isLengthValid)

        return conditionsMet >= 3 && isLengthValid


    },
    otpFunction2: async() => {
        const otp = await otpFunction();
        if ((otp / 100000) < 1) {
            return await otpFunction();
        } else {
            return otp;
        }
    },
    toUpperCase: (str) => {
        if (str.length > 0) {
            const newStr = str
                .toLowerCase()
                .replace(/_([a-z])/, (m) => m.toUpperCase())
                .replace(/_/, "");
            return str.charAt(0).toUpperCase() + newStr.slice(1);
        }
        return "";
    },
    toUpperCaseValidation: (str) => {
        if (str.length > 0) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
        return "";
    },
    validationMessageKey: (apiTag, error) => {
        let key = module.exports.toUpperCaseValidation(
            error.details[0].context.key
        );
        let type = error.details[0].type.split(".");
        type[1] = type[1] === "empty" ? "required" : type[1];
        type = module.exports.toUpperCaseValidation(type[1]);
        key = apiTag + key + type;
        return key;
    },
    getPageAndLimit: (page, limit) => {
        if (!page) page = 1;
        if (!limit) limit = PAGINATION_LIMIT;
        let limitCount = limit * 1;
        let skipCount = (page - 1) * limitCount;
        return { limitCount, skipCount };
    },
    defaultImageUrl: () => {
        return `${APP_URL}/uploads/defaultLogo.png`;
    },
    getUrl: (name, folderName) => {
        let url = "";

        if (name && folderName) {
            url = APP_URL + "/public";
            url = `${url}/uploads/${folderName}/${name}`;
        }

        return url;
    },
    getFileName: async(file) => {
        return (file) ? ((process.env.STORAGETYPE == "S3") ? file.key : file.filename) : "";
    },
    getDefaultImageUrl: () => {
        let url = APP_URL + "/public";

        url = `${url}/uploads/defaultLogo.png`;
        return url;
    },
    // getDefaultUserImageUrl: () => {
    //     let url = APP_URL + "/public";
    //     url = `${url}/uploads/defaultUserImage.png`;
    //     return url;
    // },
    defaultUserImageUrl: () => {
        let url = APP_URL + "/public";
        url = `${url}/uploads/defaultUserImage.png`;
        return url;
    },
    deleteImage: async(name, folderName) => {
        process.env.STORAGETYPE == "S3" ? deleteS3(name, folderName) : deleteFile(name, folderName);
    },
    mergeTwoObjectsByKey: (a1, a2) => {
        return a1.map((item) => {
            let a3 = a2.filter((value) => {
                return item.productId.toHexString() == value._id.toHexString()
            })
            item.productData = a3[0];
            return item;
        })
    },
    generate32BitString: async() => {
        const generatedCode = await generate32BitRandomString(32);

        const foundUser = await userModel.findOne({ status: { $ne: DELETED_STATUS }, uuid: generatedCode });
        if (foundUser) {
            return await generate32BitString();
        } else {
            return generatedCode;
        }
    },
    checkJson: (data) => {
        try {
            JSON.parse(data);
        } catch (e) {
            return false;
        }
        return true;
    },
    isValidObjectId: (data) => {
        if (ObjectId.isValid(data)) {
            if ((String)(new ObjectId(data)) === data)
                return true;
            return false;
        }
        return false;
    },
    getIndustrySeeder() {
        let industryArr = [{
                "industryName": "Advertising/PR/Events",
                "status": 1

            },
            {
                "industryName": "Agriculture/Dairy/Forestry/Fishing",
                "status": 1
            },
            {
                "industryName": "Alternate Energy",
                "status": 1
            },
            {
                "industryName": "Automotive/Automobile/Ancillaries",
                "status": 1
            },
            {
                "industryName": "Airlines/Aviation/Aerospace",
                "status": 1
            },
            {
                "industryName": "Banking/Accounting/Financial Services",
                "status": 1
            },
            {
                "industryName": "Beverages/Liquor",
                "status": 1
            },
            {
                "industryName": "Bio Technology &amp; Life Sciences",
                "status": 1
            },
            {
                "industryName": "Cement/Concrete/Readymix",
                "status": 1
            },
            {
                "industryName": "Ceramics &amp; Sanitary Ware",
                "status": 1
            },
            {
                "industryName": "Comodities Trading",
                "status": 1
            },
            {
                "industryName": "Construction &amp; Engineering",
                "status": 1
            },
            {
                "industryName": "Consulting/Advisory Services",
                "status": 1
            },
            {
                "industryName": "Consumer Electronics/Durables/Appliances",
                "status": 1
            },
            {
                "industryName": "Logistics/Courier/Freight/Transportation",
                "status": 1
            },
            {
                "industryName": "Customer Service",
                "status": 1
            },
            {
                "industryName": "Internet/E-commerce",
                "status": 1
            },
            {
                "industryName": "E-Learning/EdTech",
                "status": 1
            },
            {
                "industryName": "Education/Training",
                "status": 1
            },
            {
                "industryName": "Electrical Equipment",
                "status": 1
            },
            {
                "industryName": "Electronics Manufacturing",
                "status": 1
            },
            {
                "industryName": "Engineering/Procurement/Construction",
                "status": 1
            },
            {
                "industryName": "Entertainment/Media/Publishing",
                "status": 1
            },
            {
                "industryName": "Environmental Service",
                "status": 1
            },
            {
                "industryName": "Facility management",
                "status": 1
            },
            {
                "industryName": "Fertilizers/Pesticides/Agro chemicals",
                "status": 1
            },
            {
                "industryName": "FMCG",
                "status": 1
            },
            {
                "industryName": "Food Processing &amp; Packaged Food",
                "status": 1
            },
            {
                "industryName": "Gems &amp; Jewellery",
                "status": 1
            },
            {
                "industryName": "Glass",
                "status": 1
            },
            {
                "industryName": "Government/PSU/Defence/Public Administration",
                "status": 1
            },
            {
                "industryName": "Hospitals/Healthcare/Diagnostics",
                "status": 1
            },
            {
                "industryName": "Hotels/Hospitality/Restaurant",
                "status": 1
            },
            {
                "industryName": "Heat Ventilation Air Conditioning (HVAC)",
                "status": 1
            },
            {
                "industryName": "General Trading/Import/Export",
                "status": 1
            },
            {
                "industryName": "Insurance",
                "status": 1
            },
            {
                "industryName": "Iron/Steel",
                "status": 1
            },
            {
                "industryName": "IT/Computers - Hardware &amp; Networking",
                "status": 1
            },
            {
                "industryName": "IT/Computers - Software",
                "status": 1
            },
            {
                "industryName": "ITES/BPO/Call Center",
                "status": 1
            },
            {
                "industryName": "KPO/Research/Analytics",
                "status": 1
            },
            {
                "industryName": "Law Enforcement/Security Services",
                "status": 1
            },
            {
                "industryName": "Leather",
                "status": 1
            },
            {
                "industryName": "Industrial Automation/Industrial Equipment Mfg/Machinery",
                "status": 1
            },
            {
                "industryName": "Maritime Transportation",
                "status": 1
            },
            {
                "industryName": "Market Research",
                "status": 1
            },
            {
                "industryName": "Medical Transcription",
                "status": 1
            },
            {
                "industryName": "Metals &amp; Mining",
                "status": 1
            },
            {
                "industryName": "NGO/Social Services",
                "status": 1
            },
            {
                "industryName": "Non-Ferrous Metals (Aluminium/Zinc etc.)",
                "status": 1
            },
            {
                "industryName": "Office Equipment/Automation",
                "status": 1
            },
            {
                "industryName": "Oil/Gas/Petroleum",
                "status": 1
            },
            {
                "industryName": "Other",
                "status": 1
            },
            {
                "industryName": "Paints",
                "status": 1
            },
            {
                "industryName": "Paper",
                "status": 1
            },
            {
                "industryName": "Pharmaceutical",
                "status": 1
            },
            {
                "industryName": "Plastic/Rubber",
                "status": 1
            },
            {
                "industryName": "Power/Energy",
                "status": 1
            },
            {
                "industryName": "Printing/Packaging/Containers",
                "status": 1
            },
            {
                "industryName": "Public Relations (PR)",
                "status": 1
            },
            {
                "industryName": "Railways Speciality/Infrastructure",
                "status": 1
            },
            {
                "industryName": "Real Estate",
                "status": 1
            },
            {
                "industryName": "Recruitment/Staffing/RPO",
                "status": 1
            },
            {
                "industryName": "Retailing",
                "status": 1
            },
            {
                "industryName": "Shipping/Ports/Marine Services",
                "status": 1
            },
            {
                "industryName": "Social Media",
                "status": 1
            },
            {
                "industryName": "Sugar",
                "status": 1
            },
            {
                "industryName": "Telecom/ISP",
                "status": 1
            },
            {
                "industryName": "Textiles/Yarn/Fabrics/Garments",
                "status": 1
            },
            {
                "industryName": "Travel/Tourism",
                "status": 1
            },
            {
                "industryName": "Tyres",
                "status": 1
            },
            {
                "industryName": "Wellness/Fitness/Sports/Leisure &amp; Recreation",
                "status": 1
            },
            {
                "industryName": "Wood",
                "status": 1
            }
        ]
        return industryArr;
    }
};
