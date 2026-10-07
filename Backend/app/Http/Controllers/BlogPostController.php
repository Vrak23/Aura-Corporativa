<?php

namespace App\Http\Controllers;

use App\Http\Requests\BlogPostRequest;
use App\Models\BlogPost;
use Illuminate\Http\JsonResponse;

class BlogPostController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(
            BlogPost::query()
                ->where('published', true)
                ->orderByDesc('published_at')
                ->orderByDesc('id')
                ->get()
        );
    }

    public function show(BlogPost $blogPost): JsonResponse
    {
        abort_unless($blogPost->published, 404);

        return response()->json($blogPost);
    }

    public function adminIndex(): JsonResponse
    {
        return response()->json(
            BlogPost::query()->orderByDesc('updated_at')->get()
        );
    }

    public function store(BlogPostRequest $request): JsonResponse
    {
        $attributes = $request->validated();
        $attributes['published_at'] = $attributes['published']
            ? ($attributes['published_at'] ?? now())
            : null;

        $blogPost = BlogPost::create($attributes);

        return response()->json($blogPost, 201);
    }

    public function update(BlogPostRequest $request, BlogPost $blogPost): JsonResponse
    {
        $attributes = $request->validated();

        if (array_key_exists('published', $attributes)) {
            $attributes['published_at'] = $attributes['published']
                ? ($attributes['published_at'] ?? $blogPost->published_at ?? now())
                : null;
        }

        $blogPost->update($attributes);

        return response()->json($blogPost);
    }

    public function destroy(BlogPost $blogPost): JsonResponse
    {
        $blogPost->delete();

        return response()->json([
            'message' => 'Noticia eliminada correctamente.',
        ]);
    }
}
