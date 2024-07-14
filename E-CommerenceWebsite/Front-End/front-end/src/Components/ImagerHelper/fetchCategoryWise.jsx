import SummaryApi from '../../Common';

const fetchCategoryWise = async (category) => {
    const response = await fetch(SummaryApi.categoryWiseProduct.url, {
        method: SummaryApi.categoryWiseProduct.method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ category }),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const dataResponse = await response.json();
    return dataResponse;
};

export default fetchCategoryWise;
