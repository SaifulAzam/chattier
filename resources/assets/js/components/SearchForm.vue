<template>
    <form @submit.prevent="onSubmitSearch">
        <b-field>

            <b-autocomplete
                placeholder="Find people"
                v-model="keyword"
                :data="suggestions"
                clear-on-select
                open-on-focus
                @input="fetchSuggestions"
                @select="onSelect"
            >
                <template slot-scope="{ option: user }">
                    <media-object :image-size="24">
                        <img slot="image" :src="user.avatar" :alt="user.username" class="is-rounded">
                        <template slot="content">
                            {{ user.firstname }} {{ user.lastname }}
                            <span class="has-text-grey-light">&#64;{{ user.username }}</span>
                        </template>
                    </media-object>
                </template>
            </b-autocomplete>

            <p class="control">
                <button class="button is-primary">
                    <b-icon icon="search"/>
                </button>
            </p>

        </b-field>
    </form>
</template>

<script>
import debounce from 'lodash/debounce';
import MediaObject from './MediaObject';
import { profile } from '@/util/mixins';

export default {
    components: { MediaObject },
    mixins: [profile],
    data () {
        return {
            keyword: '',
            suggestions: []
        };
    },
    computed: {
        trimmedKeyword () {
            return this.keyword.trim();
        }
    },
    methods: {
        fetchSuggestions: debounce(function () {
            if (this.trimmedKeyword === '') return;

            this.$http.get('/search', { params: { keyword: this.trimmedKeyword, limit: 5 } })
                .then(({ data }) => {
                    this.suggestions = data;
                })
                .catch((error) => console.log(error.response));
        }, 800),
        onSelect (user) {
            if (!user) return;

            this.$router.push(this.profile(user));
        },
        onSubmitSearch () {
            if (this.trimmedKeyword === '') return;

            this.$router.push({ path: '/search', query: { keyword: this.trimmedKeyword } });
            this.keyword = '';
        }
    },
    watch: {
        trimmedKeyword (current) {
            if (current === '') this.suggestions = [];
        }
    }
};
</script>
