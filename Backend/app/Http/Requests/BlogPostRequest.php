<?php

namespace App\Http\Requests;

use App\Models\BlogPost;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class BlogPostRequest extends FormRequest
{
    protected function prepareForValidation(): void
    {
        $fields = ['title', 'slug', 'excerpt', 'content', 'category', 'image_url'];
        $values = [];

        foreach ($fields as $field) {
            if ($this->has($field)) {
                $value = $this->input($field);
                $values[$field] = is_string($value) ? strip_tags(trim($value)) : $value;
            }
        }

        if (isset($values['image_url']) && $values['image_url'] === '') {
            $values['image_url'] = null;
        }

        $this->merge($values);
    }

    public function rules(): array
    {
        $required = $this->isMethod('post')
            ? ['required']
            : ['sometimes', 'required'];
        $blogPost = $this->route('blogPost');

        return [
            'title' => [...$required, 'string', 'max:180'],
            'slug' => [
                ...$required,
                'string',
                'max:200',
                'alpha_dash',
                Rule::unique('blog_posts', 'slug')->ignore($blogPost?->id),
            ],
            'excerpt' => [...$required, 'string', 'max:300'],
            'content' => [...$required, 'string', 'max:50000'],
            'image_url' => ['nullable', 'url', 'max:2048'],
            'category' => [...$required, Rule::in(BlogPost::CATEGORIES)],
            'published' => [...$required, 'boolean'],
            'published_at' => ['nullable', 'date'],
        ];
    }
}
