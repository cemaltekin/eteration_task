import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await fetch('https://5fc9346b2af77700165ae514.mockapi.io/products');
  const data = await response.json();
  return data;
});

export const setSearchTerm = createAction('products/setSearchTerm');

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    status: 'idle',
    error: null,
    sortOption: 'oldToNew',
    selectedBrands: [],
    selectedModels: [],
    searchTerm: '',
  },
  reducers: {
    setSortOption: (state, action) => {
      state.sortOption = action.payload;
    },
    toggleBrandFilter: (state, action) => {
      const brand = action.payload;
      if (state.selectedBrands.includes(brand)) {
        state.selectedBrands = state.selectedBrands.filter((b) => b !== brand);
      } else {
        state.selectedBrands.push(brand);
      }
    },
    toggleModelFilter: (state, action) => {
      const model = action.payload;
      if (state.selectedModels.includes(model)) {
        state.selectedModels = state.selectedModels.filter((m) => m !== model);
      } else {
        state.selectedModels.push(model);
      }
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setSortOption, toggleBrandFilter, toggleModelFilter } = productsSlice.actions;

export default productsSlice.reducer;
