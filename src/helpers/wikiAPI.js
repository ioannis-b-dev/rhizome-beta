//WIKIPEDIA API:https://www.mediawiki.org/w/api.php?action=help&modules=query
import axios from "axios";
const BASE_URL =
    "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*";

export const getWikiData = async (pageTitle, numLinks) => {};
export const getParentData = async (pageTitle) => {
    const params = {
        titles: pageTitle,
        prop: "info|pageprops|pageterms",
        inprop: "watchers|associatedpage|url",
        wbptterms: "alias|description",
    };

    const response = await axios.get(BASE_URL, { params });
    const data = Object.values(response.data.query.pages);
    return parseData(data)[0];
};

export const getChildrenData = async (pageTitle, numLinks) => {
    const allData = await getALLPageLinksData(pageTitle);
    console.log(allData);
    const f_data = filterData(allData);
    const selectedData = getRandomLinks(f_data, numLinks);

    return parseData(selectedData);
};

const getPageLinksData = async (pageTitle, continueID) => {
    const params = {
        titles: pageTitle,
        generator: "links",
        prop: "info|pageprops|pageterms",
        inprop: "watchers|associatedpage|url",
        wbptterms: "alias|description",
        gpllimit: "max",
        gplcontinue: continueID,
    };

    const response = await axios.get(BASE_URL, {
        params: { ...params, gplcontinue: continueID },
    });
    const linksData = Object.values(response.data.query.pages);
    let nextID = null;
    // if (linksData.length === 500) nextID = response.data.continue.gplcontinue;
    return { linksData, nextID };
};

const getALLPageLinksData = async (pageTitle) => {
    let continueSearch = true;
    let continueID;
    let allLinksData = [];
    while (continueSearch) {
        const { linksData, nextID } = await getPageLinksData(
            pageTitle,
            continueID
        );
        allLinksData.push(...linksData);

        nextID ? (continueID = nextID) : (continueSearch = false);
    }
    console.log("rawdata: ", allLinksData.length);
    return allLinksData;
};

//filter incoming array using the random numbers for indeces
export const getRandomLinks = (linksData, numLinks) => {
    //generate 10 UNIQUE random numbers
    const randomNums = new Set();
    while (randomNums.size < numLinks) {
        randomNums.add(Math.floor(Math.random() * linksData.length));
    }

    const filteredLinks = linksData.filter((_, index) => randomNums.has(index));
    //return the resulting array
    return filteredLinks;
};

const filterData = (data) => {
    const data_f1 = removeInvalidPages(data);
    return removeEmptyPages(data_f1);
};

const parseData = (data) => {
    return data.map((d) => {
        return {
            pageid: d.pageid,
            id: d.title,
            url: d.fullurl,
            textLength: d.length,
            pageViews: d.watchers,
            alias: d.terms?.alias,
            desc: d.terms?.description,
            // wikiDesc: d.pageprops["wikibase-shortdesc"],
        };
    });
};

const removeInvalidPages = (data) => {
    return data.filter((link) => link.ns === 0);
};

const removeEmptyPages = (data) => {
    return data.filter((link) => link.length > 0);
};

export const getPageID = async (pageTitle) => {
    const response = await axios.get(BASE_URL, {
        params: { titles: pageTitle, indexpageids: true },
    });
    return response.data.query.pageids[0];
};

export const getPageLinksInfo = async (pageTitle, linksNum) => {
    const params = {
        titles: pageTitle,
        generator: "links",
        prop: "info|pageprops|pageterms",
        inprop: "watchers|associatedpage|url",
        wbptterms: "alias|description",
        gpllimit: linksNum,
    };

    const response = await axios.get(BASE_URL, { params });
    const linksData = Object.values(response.data.query.pages);

    return linksData;
};

//===============================//

//===============================//
//---------------------------------------------------------------
//--2-----------------------DATA FILTERING-----------------------
//---------------------------------------------------------------

//----------------------------
//STAGE 1 : FILTERING RAW DATA
//----------------------------

//-----------------------------------------
//STAGE 2: FILTERING BASED ON VISUALIZATION
//-----------------------------------------

//---------------------------------------------------------------
//--3-----------------------DATA PARSING-------------------------
//---------------------------------------------------------------

//-----------------------------------------
//STAGE 1:PREPARE FOR OUR NODE SERVER
//-----------------------------------------
//formatting data to a more readable version
const getParsedLinksData = (linksRawData) => {
    const parsedData = linksRawData.map((data) => {
        const {
            title,
            pageid,
            fullurl,
            length,
            watchers,
            terms: { alias, description } = {},
            pageprops: { "wikibase-shortdesc": wikiDesc } = {},
        } = data;

        return {
            title,
            id: pageid,
            url: fullurl,
            textLength: length,
            pageViews: watchers,
            alias,
            desc: description,
            wikiDesc,
        };
    });

    return parsedData;
};

//-----------------------------------------
//STAGE 2 PREPARE FOR OUR MAX APP
//-----------------------------------------
//formating data to be received by our max app(use only the information we need for each stage)
const parseLinksForMax = (linksProcessed) => {
    const linksTitle = linksProcessed.map((data) => {
        const { title } = data;
        return title;
    });
    const linksLength = linksProcessed.map((data) => {
        const { textLength } = data;
        return textLength;
    });
    return { linksTitle, linksLength };
};
//----------------------------------------------------------------------------
//--4--------------------EXPORTING REQUESTS TO OUR LOCAL SERVER---------------
//----------------------------------------------------------------------------

export const getRandLinks = async (pageTitle, numLinks) => {
    const rawData = await getALLPageLinksData(pageTitle);
    const filteredData1 = removeInvalidPages(rawData);
    const filteredData2 = removeEmptyPages(filteredData1);
    const parsedData = getParsedLinksData(filteredData2);

    const randlinks = getRandomLinks(parsedData, numLinks);
    const linksForMax = parseLinksForMax(randlinks);

    return linksForMax;
};

//not available yet
export const getLinksToPage = async (pageTitle) => {
    const response = await axios.get(BASE_URL, {
        params: { titles: pageTitle, prop: "linkshere", lhprop: "title" },
    });
    return response;
};
