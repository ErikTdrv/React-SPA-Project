const API_URL = "http://localhost:8080";

export const addProduct = async (product, productName) => {
    product.productName = productName;
    try {
        console.log('here')
        let request = await fetch(`${API_URL}/add-product`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(product),
        });
        let data = await request.json();
        console.log(data)
        if(request.ok){
          return data
        }else {
          throw new Error(data.error)
        }
    } catch (error) {
        return error
    }
};
