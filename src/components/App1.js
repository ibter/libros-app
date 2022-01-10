import "./App.css";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";


function App() {
  
  
  const [items, setItems] = useState ([]);
  const [pageCount, setpageCount] = useState(0);

  let limit = 4;

  useEffect(() => {
    const getBooks = async () => {    
        const res = await fetch(
          `http://localhost:3000/books?_page=1&_limit=${limit}`
        );
        const data = await res.json();
        const total = res.headers.get('x-total-count');
        setpageCount(Math.ceil(total/limit));
        //console.log(Math.ceil(total/2));

        setItems(data);
        };

        getBooks();
  }, []);

  console.log(items);

  const fetchBooks = async (currentPage) => {
    const res = await fetch(

      `http://localhost:3000/books?_page=${currentPage}&_limit=${limit}`

    );
    const data = await res.json();
    return data;

  };

  const handlePageClick = async (data) =>{

      console.log(data.selected);
      let currentPage = data.selected + 1

      const booksFormServer = await fetchBooks(currentPage);

      setItems(booksFormServer);
  }

  
  
  return (
    <div>
      {
        items.map((item) => {
          return <div key={item.id} className="col-sm-6"> 
                    <div className="card shadow-sm w-100" >
                      <div className="card-body">
                        <h5 className="card-title">Id: {item.id} </h5>
                        <h5 className="card-title">titulo: {item.name} </h5>
                        <p className="card-title">categoria: {item.category} </p>
                      </div>
                    </div>

                  </div>



        }
        
        
        )


      }







      <ReactPaginate 
        previousLabel={'anterior'}
        nextLabel={'siguiente'}
        breakLabel={'....'}
        pageCount={pageCount}
        marginPagesDisplayed={3}
        pageRangeDisplayed={2}
        onPageChange = {handlePageClick}
        containerClassName={'pagination justify-content-center'}
        pageClassName={'page-item'}
        previousClassName={'page-item'}
        pageLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        breakClassName={'page-item'}
        breakLinkClassName={'page-link'}
        activeClassName={'active'}
      />
    </div>
  );  
}

export default App;
