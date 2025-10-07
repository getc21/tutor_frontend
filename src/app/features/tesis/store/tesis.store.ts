import { computed, signal } from '@angular/core';
import { Tesis } from '../../../core/models/tesis.model';

export interface TesisState {
  tesis: Tesis[];
  selectedTesis: Tesis | null;
  loading: boolean;
  error: string | null;
}

export class TesisStore {
  private state = signal<TesisState>({
    tesis: [],
    selectedTesis: null,
    loading: false,
    error: null
  });

  // Selectors
  tesis = computed(() => this.state().tesis);
  selectedTesis = computed(() => this.state().selectedTesis);
  loading = computed(() => this.state().loading);
  error = computed(() => this.state().error);

  // Actions
  setTesis(tesis: Tesis[]) {
    this.state.update(state => ({
      ...state,
      tesis
    }));
  }

  setSelectedTesis(tesis: Tesis | null) {
    this.state.update(state => ({
      ...state,
      selectedTesis: tesis
    }));
  }

  setLoading(loading: boolean) {
    this.state.update(state => ({
      ...state,
      loading
    }));
  }

  setError(error: string | null) {
    this.state.update(state => ({
      ...state,
      error
    }));
  }
}